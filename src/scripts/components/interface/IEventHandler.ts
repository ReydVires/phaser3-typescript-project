export interface IEventHandler {

	registerEvent (key: string, value: Function, once?: boolean): void;

}