export interface RuleProp {
    type: 'required' | 'email' | 'number' | 'custom';
    message: string;
    validator?: Function;
}