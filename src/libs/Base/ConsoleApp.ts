import BaseApp from "./BaseApp";

import { readdirSync } from "fs";
import { Command } from "./Console/Command";
import { Dictionary } from "libs/types";
import path from 'path';

export class ConsoleApp extends BaseApp {
    protected commands: Dictionary<typeof Command> = {};


    public handler() {
        this.registerCommands();
    }

    protected async load(folder: string) {
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

    /**
     * Register the commands
     */
    protected registerCommands() { }
}