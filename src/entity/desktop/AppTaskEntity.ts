import { AnyBaseModel } from "@/model/basic/AnyBaseModel";
import { AppEntity } from "./AppEntity";
import { InAppTask } from "@/interface/desktop/InAppTask";
import { Expose } from "class-transformer";

export class AppTaskEntity extends AnyBaseModel implements InAppTask {
  @Expose()
  id?:number|string;

  @Expose()
  app!: AppEntity;

  @Expose()
  modelDom?: HTMLElement;

  @Expose()
  taskBarDom?: HTMLElement;

  @Expose()
  taskViewDom?: HTMLElement | undefined;

  @Expose()
  isActive = true;

  @Expose()
  isMinimize = false;

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

  setTaskBarDom(taskBarDom?: HTMLElement) {
    this.taskBarDom = taskBarDom;
  }

  setTaskViewDom(taskDom?: HTMLElement) {
    this.taskViewDom = taskDom;
  }
  
}