import Command, { flags } from "@oclif/command";
import { Input } from "@oclif/parser";

export default abstract class extends Command {
  static flags = {
    verbose: flags.boolean({})
  };

  static args: Array<any> = [];
}
