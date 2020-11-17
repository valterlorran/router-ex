export class Command {
    protected signature: string;
    protected description: string;

    public getSignature() {
        return this.signature;
    }

    public handle(){}
}