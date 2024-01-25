import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { AppEntity } from "./AppEntity";
import { InAppTask } from "@/interface/desktop/InAppTask";
import { Expose } from "class-transformer";

export class AppTaskEntity extends AnyBaseModel implements InAppTask {
  @Expose()
  app!: AppEntity;

  @Expose()
  modelDom!: HTMLElement;

  @Expose()
  taskBarDom!: HTMLElement;

  @Expose()
  isActive!: boolean;

  @Expose()
  isMinimize!: boolean;

  constructor(app: AppEntity) {
    super();
    this.app = app;
    this.isActive = true;
    this.isMinimize = false;
  }

  setActive(isActive: boolean) {
    this.isActive = isActive;
  }

  setMinimize(isMinimize: boolean) {
    this.isMinimize = isMinimize;
  }

  setModelDom(modelDom: HTMLElement) {
    this.modelDom = modelDom;
  }

  setTaskBarDom(taskBarDom: HTMLElement) {
    this.taskBarDom = taskBarDom;
  }
  
}