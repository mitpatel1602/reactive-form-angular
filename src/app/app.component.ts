import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { noSpaceAllowed , CustomValidators } from './validators/nospaceAllowed.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angular-reactive-form';

  reactiveForm !: FormGroup ;

  isEmail: Boolean = false;
  formStatus:string = '';
  formData: any  = {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      // firstName : new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]), this is are using classes and down one is using method 
      // lastName : new FormControl(null,[ Validators.required , CustomValidators.noSpaceAllowed]),
      firstName : new FormControl(null, [Validators.required, noSpaceAllowed]),
      lastName : new FormControl(null,[ Validators.required , noSpaceAllowed]),
      email : new FormControl(null, [Validators.required,Validators.email]),
      userName : new FormControl(null, Validators.required , CustomValidators.checkUserName ),
      phoneNumber : new FormControl(null,[Validators.required , Validators.min(1000000000) , Validators.max(10000000000)]),
      dob : new FormControl(null),
      gender : new FormControl('male'),
      address: new FormGroup({
        street : new FormControl(null,Validators.required),
        country : new FormControl(null,Validators.required),
        city : new FormControl(null),
        region : new FormControl(null),
        postal : new FormControl(null , Validators.required),
      }),
      skills: new FormArray([
        new FormControl(null , Validators.required),
      ]),
      experience: new FormArray([ 
         
      ]),
    })
        // value change only for one control
    // this.reactiveForm.get('firstName')?.valueChanges.subscribe((value)=>{

    //     console.log(value);
    // })

    // value change for all the formGroup
    // this.reactiveForm.valueChanges.subscribe((data) =>{
    //     console.log(data);
    // })

    // status change for all formGroup
    // this.reactiveForm.statusChanges.subscribe((status) =>{
    //   console.log(status);
    // })
    
    this.reactiveForm.statusChanges.subscribe((status) =>{
      // console.log(status);
      this.formStatus = status;
    })


  }

  isValid(){
     this.reactiveForm.get('email')?.statusChanges.subscribe((status)=>{
      // console.log(status);
      if(status === 'VALID')
      {
        this.isEmail = true;
      }
      else{
        this.isEmail = false;
      }
    })
    
  }

  createUserName(){
    let userName = '';
    let first = this.reactiveForm.value.firstName;
    let last = this.reactiveForm.value.lastName;
    let dob = this.reactiveForm.value.dob;
    

    if(first.length >= 3 )
    {
      userName += first.slice(0,2);
    }
    else{
      userName += first;
    }
    if(last.length >= 3){
      userName += last.slice(0,2)
    }
    else{
      userName += last
    }
    let dateTime = new Date(dob)
    userName += dateTime.getFullYear();

    userName = userName.toLowerCase();
    // console.log(userName);

    // set value in form Group
      // this.reactiveForm.setValue({
      //   firstName : this.reactiveForm.get('firstName')?.value,
      //   lastName :this.reactiveForm.get('lastName')?.value,
      //   email : this.reactiveForm.get('email')?.value,
      //   userName : userName,
      //   phoneNumber : this.reactiveForm.get('phoneNumber')?.value,
      //   dob : this.reactiveForm.get('dob')?.value,
      //   gender : this.reactiveForm.get('gender')?.value,
      //   address: {
      //     street : this.reactiveForm.get('address.street')?.value,
      //     country :this.reactiveForm.get('address.country')?.value,
      //     city : this.reactiveForm.get('address.city')?.value,
      //     region :this.reactiveForm.get('address.region')?.value,
      //     postal : this.reactiveForm.get('address.postal')?.value,
      //   },
      //   skills: this.reactiveForm.get('skills')?.value,
      //   experience: this.reactiveForm.get('experience')?.value,
      // })

      // set value in form control
      this.reactiveForm.get('userName')?.setValue(userName)


      //patchValue value 
      // this.reactiveForm.patchValue({
      //   userName : userName,
      //   address:{
      //     city : 'New Delhi'
      //   }
      // })
  }



  formSubmitted(){
    console.log(this.reactiveForm);
    this.formData = this.reactiveForm.value;
    this.reactiveForm.reset();
  }

  SkillAddDynamic() {
         (<FormArray> this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
    }

  DeleteSkills(index:number){
          (<FormArray> this.reactiveForm.get('skills')).removeAt(index)
    //       const controls = <FormArray>this.reactiveForm.get('skills');
    //       controls.removeAt(index);
   }
  addSkills(){
    return (this.reactiveForm.get('skills') as FormArray).controls
  }
  addExp(){
    return (this.reactiveForm.get('experience') as FormArray).controls
  }

  addExperience(){
    const frmGroup =  new FormGroup({
      companyName : new FormControl(null),
      position : new FormControl(null),
      totalExp : new FormControl(null),
      start : new FormControl(null),
      end : new FormControl(null),
    });
    (<FormArray>this.reactiveForm.get('experience')).push(frmGroup);
  }

  deleteExp(index : number){
    (<FormArray> this.reactiveForm.get('experience')).removeAt(index)
    //       const controls = <FormArray>this.reactiveForm.get('experience');
    //       controls.removeAt(index);
  }
}
