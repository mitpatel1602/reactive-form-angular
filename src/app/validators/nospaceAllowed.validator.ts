import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormArrayName, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

Injectable({
    providedIn:'root'
})

export const noSpaceAllowed = ( control : FormControl | FormArray | FormArrayName | AbstractControl) =>{

    if(control.value != null && control.value.indexOf(' ') != -1)
    {
        return {nospaceAllowed : true}
    }
    else
    {
        return null;
    }
}


export class CustomValidators{

  static noSpaceAllowed( control : FormControl | AbstractControl){

        if(control.value != null && control.value.indexOf(' ') != -1)
        {
            return {nospaceAllowed : true}
        }
        else
        {
            return null;
        }
    }
    static checkUserName(control:AbstractControl): Promise<any>{
                    return userNameAllowed(control.value);
        }
}


function userNameAllowed(username:string){
    let takenUserNames = ['johnsmith','manJha','sarahKing'];

    return new Promise( (resolve) =>{
        setTimeout( () =>{
            if(takenUserNames.includes(username))
            {
                resolve({checkUsername : true});
            }
            else{
                resolve(null);
            }
        }, 2500);
    });
}