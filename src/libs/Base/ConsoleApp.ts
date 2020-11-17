import BaseApp from "./BaseApp";

import { readdirSync } from "fs";
import { Command } from "./Console/Command";
import { Dictionary } from "libs/types";

export class ConsoleApp extends BaseApp {
    protected commands: Dictionary<typeof Command> = {};


    public handler() {
        
    }

    protected async load(folder: string) {
        const files:string[] = await readdirSync(folder);

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const command: any = (await import(file)).default;

            if (command.prototype instanceof Command) {
                this.commands[(command as Command).getSignature()] = command;
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