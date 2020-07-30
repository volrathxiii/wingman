#!/usr/bin/env node
import Processor from "./index"
import { argv } from "process";

const action = String(argv[2]).trim();

let processor = new Processor();

switch (action) {
  case 'classify':
    console.log(processor.execute(argv[3]))
    break;

  default:
    throw new Error(`Invalid action`)
}