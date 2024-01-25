import { InApp } from "@/interface/desktop/InApp";
import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { Expose } from "class-transformer";
import { AppTaskEntity } from "./AppTaskEntity";

export class AppEntity extends AnyBaseModel implements InApp {
  @Expose()
  name!: string;

  @Expose()
  icon!: string;

  @Expose()
  description?: string | undefined;

  @Expose()
  handler?: ((app: AppEntity | AppTaskEntity) => void);

  @Expose()
  dom?: HTMLElement ;

  setDom(dom: HTMLElement) {
    this.dom = dom
  }

  setHandler(handler: (app: AppEntity | AppTaskEntity) => void) {
    this.handler = handler
  }
}