#!/usr/bin/env node
import Processor from "./index"
import { argv } from "process";

const action = String(argv[2]).trim();

let processor = new Processor();
console.log(action)
switch (action) {
  case 'classify':
    console.log(processor.Classifier.getClassifications(argv[3]))
    break;

  default:
    throw new Error(`Invalid action`)
}