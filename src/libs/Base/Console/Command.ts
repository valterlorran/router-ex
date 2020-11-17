export default class Command {
    protected signature: string;
    protected description: string;


    public getSignature() {
        return this.signature;
    }

    protected handle(){}
}