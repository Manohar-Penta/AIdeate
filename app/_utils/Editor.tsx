import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as ReactDomServer from "react-dom/server";
import { HiMiniH1, HiMiniH2, HiMiniH3 } from "react-icons/hi2";
import type EditorJS from "@editorjs/editorjs";

export async function initiate(
  ref: React.RefObject<any | undefined>,
  data?: any,
  readOnly: boolean = false
) {
  const EditorJS = (await import("@editorjs/editorjs")).default;
  const Header = (await import("@editorjs/header")).default;
  const List = (await import("@editorjs/list")).default;
  const Quote = (await import("@editorjs/quote")).default;
  const Image = (await import("@editorjs/simple-image")).default;

  if (!ref.current) {
    const editor = new EditorJS({
      autofocus: !readOnly,
      placeholder: "Tell your story...",
      minHeight: 300,
      readOnly,
      data: data,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3],
          },
          toolbox: [
            {
              icon: ReactDomServer.renderToString(<HiMiniH1 />),
              title: "Heading 1",
              data: {
                level: 1,
              },
            },
            {
              icon: ReactDomServer.renderToString(<HiMiniH2 />),
              title: "Heading 2",
              data: {
                level: 2,
              },
            },
            {
              icon: ReactDomServer.renderToString(<HiMiniH3 />),
              title: "Heading 3",
              data: {
                level: 3,
              },
            },
          ],
        },
        image: Image,
        unsplashImage: {
          class: UnsplashImage,
          inlineToolbar: true,
        },
        aiContent: {
          class: AIContent,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
      },
    });
    ref.current = editor;
  }
}

class UnsplashImage {
  container: HTMLFormElement;
  page: number;
  readOnly: boolean;

  constructor({
    data,
    readOnly,
  }: {
    data: { img: string };
    readOnly: boolean;
  }) {
    this.container = document.createElement("form");
    if (data.img) {
      const img = document.createElement("img");
      img.src = data.img;
      img.className = "p-2";
      this.container.append(img);
    }
    this.page = 1;
    this.readOnly = readOnly;
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      title: "Unsplash Image",
      icon: ReactDomServer.renderToString(
        <img src="https://unsplash.com/favicon-16x16.png" />
      ),
    };
  }

  async handler(event: Event) {
    event.preventDefault();
    const response = await fetch("/api/unsplash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: this.page,
        query: (
          (event.target as HTMLFormElement).elements[0] as HTMLInputElement
        ).value,
      }),
    });

    const data = await response.json();

    if (!data.results) return;

    const divbox = document.createElement("div");
    data.results.forEach((result: any) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.ariaDescription = result.alt_description;
      image.className = "p-2";
      image.onclick = (e) => {
        this.container.innerHTML = "";
        const img = e.target as HTMLImageElement;
        img.className = "border border-primary rounded h-1/2 mx-auto";
        this.container.append(e.target as HTMLImageElement);
      };
      divbox.appendChild(image);
    });
    divbox.className = "flex gap-2 border-2 border-white overflow-scroll p-2";

    if (this.container.childElementCount > 1) {
      this.container?.lastChild?.remove();
    }

    this.container?.appendChild(divbox);
    this.page += 1;
  }

  onChangeHandler(event: Event) {
    this.page = 1;
  }

  render() {
    if (this.container.childElementCount > 0) return this.container;

    const input = ReactDomServer.renderToString(
      <>
        <div className="border-border border p-2 items-center flex flex-col">
          <Input
            type="text"
            placeholder="Search for an image..."
            className="mt-4"
          />
          {/* <br /> */}
          <Button type="submit" className="mt-4">
            Get images
          </Button>
        </div>
      </>
    );
    this.container.innerHTML = input;
    this.container.addEventListener("submit", (event: Event) => {
      this.handler(event);
    });
    this.container.addEventListener("input", (event) => {
      this.onChangeHandler(event);
    });
    return this.container;
  }

  save(container: HTMLFormElement) {
    return { img: (container.childNodes[0] as HTMLImageElement).src };
  }

  validate(savedData: { img: HTMLImageElement }) {
    if (!savedData || !savedData.img || typeof savedData.img !== "string") {
      return false;
    }
    return true;
  }
}

class AIContent {
  data: string;
  api: EditorJS;
  container: HTMLDivElement;
  readOnly: boolean;

  constructor({
    data,
    api,
    readOnly = false,
  }: {
    data: { generated: string };
    api: EditorJS;
    readOnly: boolean;
  }) {
    this.data = data.generated;
    this.api = api;
    this.container = document.createElement("div");
    this.container.className = "border border-primary rounded p-2";
    this.readOnly = readOnly;
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      title: "Generate with AI",
      icon: ReactDomServer.renderToString(
        <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" />
      ),
    };
  }

  render() {
    if (this.data) {
      const para = document.createElement("p");
      if (!this.readOnly) para.contentEditable = "true";
      para.textContent = this.data;
      this.container.append(para);
      this.container.className = "border-none p-1";
      return this.container;
    }

    const input = ReactDomServer.renderToString(
      <>
        <Input
          type="text"
          placeholder="Enter your prompt..."
          className="mb-2"
        />
        <Button type="button" className="mx-auto">
          Generate
        </Button>
      </>
    );

    this.container.innerHTML = input;

    this.container.childNodes[1].addEventListener("click", async (event) => {
      const string = (
        this.container.childNodes[0] as HTMLInputElement
      ).value.trim();
      if (string == "") return;

      const blocksdata = await this.api.saver.save();
      const index = this.api.blocks.getCurrentBlockIndex();

      const { spinner } = await import("../../components/Spinner");
      this.container.replaceChildren(spinner);

      fetch("/api/aigenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index,
          data: blocksdata,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((resData) => {
          const para = document.createElement("p");
          para.contentEditable = "true";
          para.textContent = resData.msg;
          this.container.replaceChildren(para);
          this.container.className = "";
        });
    });

    return this.container;
  }

  save(content: HTMLDivElement) {
    if (content.childElementCount == 1)
      return { generated: content.childNodes[0].textContent };
    else
      return { generated: (content.childNodes[0] as HTMLInputElement).value };
  }

  validate(savedData: { generated: string }) {
    if (
      !savedData ||
      !savedData.generated ||
      typeof savedData.generated !== "string"
    ) {
      return false;
    }
    return true;
  }
}
