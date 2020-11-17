import BaseApp from "./BaseApp";

import { readdirSync } from "fs";
import { Command } from "./Console/Command";
import { Dictionary } from "libs/types";
import path from 'path';

export class ConsoleApp extends BaseApp {
    private commands: Dictionary<typeof Command> = {};
    protected registerCommands: Array<string> = [];

    public async handler() {
        await this.loadCommands();

        await this.runCommand();
    }

    private async runCommand() {
        const commandSignature = process.argv[2];

        if (!commandSignature) {
            return;
        }
        const commandClass = this.commands[commandSignature];
        if (!commandClass) {
            throw new Error(`Command "${commandSignature}" not found`);
        }
        
        const command = new commandClass();
        await command.handle();
    }

    private async loadCommands() {
        for(var i in this.registerCommands) {
            await this.load(this.registerCommands[i]);
        }
    }

    private async load(folder: string) {
        const files:string[] = await readdirSync(folder);

        for (let index = 0; index < files.length; index++) {
            const file = path.join(folder, files[index]);
            const command: any = (await import(file)).default;
            if (command.prototype instanceof Command) {
                const instance: Command = new command();
                this.commands[instance.getSignature()] = command;
            } else {
                console.log(file, 'Is not a Command');
            }
        }
    }

    /**
     * Schedule commands
     */
    protected schedule() { }
}