// import UserInputAction from './userInputAction';

// export class UserInputState {
//     public constructor(
//         public userInput: string = ''
//     ) {}
// }

// export default function userInputReducer(state:UserInputState, action:UserInputAction) {
//     switch (action.type) {
//         case 'update':
//             return {userInput: action.value}
//         case 'reset':
//             return {userInput: ''}
//         default:
//             throw new Error('Unknown UserInput action type')
//     }
// }

// // import CoreService from '../core/CoreService';

// // export default class UIService {

// //     private userInput: string

// //     public constructor(private core:CoreService) {
// //         this.core.noop()
// //     }

// //     public get UserInput() {
// //         return this.userInput
// //     }

// //     public set UserInput(v:string) {
// //         this.userInput = v
// //     }


// // }