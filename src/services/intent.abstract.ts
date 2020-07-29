export type UtterancesType = string[];

export interface IntentInterface {
  label: string;
  utterances: UtterancesType;
}

export abstract class IntentAbstract implements IntentInterface
{
  abstract label: string;
  abstract utterances: string[];

  
}

export default IntentAbstract