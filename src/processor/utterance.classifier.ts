import Services from "../services";
import {BayesClassifier} from "natural"

export default class UtteranceClassifier
{
  private classifier: BayesClassifier

  constructor(services: Services)
  {
    this.classifier = this.setUpClassifier(new BayesClassifier(), services);
  }

  setUpClassifier(classifier: BayesClassifier,services: Services)
  {
    classifier.events.on('trainedWithDocument', function (obj) {
      console.log(obj);
   });

    services.getAllIntents().forEach((intent)=>{
      intent.getUttenrances().forEach(utterance=>{
        classifier.addDocument(utterance,`${intent.service}.${intent.label}`)
      })
    })
    classifier.train()

    // classifier.save('classifier.json', function(err, classifier) {
    //     // the classifier is saved to the classifier.json file!
    // });
  

    return classifier
  }

  classify(utterance:string):string
  {
    return this.classifier.classify(utterance)
  }

  getClassifications(utterance:string): Array<Object>
  {
    return this.classifier.getClassifications(utterance)
  }
}