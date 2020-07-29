import Services from "../services";
import UtteranceClassifier from "./utterance.classifier"

export default class Processor
{
  Services: Services;
  Classifier: UtteranceClassifier;
  
  constructor()
  {
    this.Services = new Services()
    this.Classifier = new UtteranceClassifier(this.Services)
  }
}