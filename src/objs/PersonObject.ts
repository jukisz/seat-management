export default class PersonObject {
  gender?: string | null;
  content?: string | null;
  public constructor(params: PersonObject = {} as PersonObject) {
    let { gender = "", content = "" } = params;
    this.gender = gender;
    this.content = content;
  }
}
