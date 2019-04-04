import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur/longueur.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProblemes: ITypeProbleme[];
  errorMessage: string; 
  constructor(private fb: FormBuilder, private typesProbleme: TypeProblemeService) {}

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenomProbleme : ['', [ZonesValidator.plageMinimum(3), Validators.required]],
      nomProbleme : ['', [Validators.maxLength(50), Validators.required]],
      noTypeProbleme: ['', [Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),
       telephone: [{value: '', disabled: true}], 
    });

    this.typesProbleme.obtenirTypesProbleme()
    .subscribe(cat => this.typesProblemes = cat, error => this.errorMessage = <any>error);
  }

  gestionNotification(typeNotif: string): void {
    const courrielGroupeControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const telephoneControl = this.problemeForm.get('telephone');

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (typeNotif === 'courriel') {
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();  
      
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();

      courrielGroupeControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
    } else if (typeNotif === 'telephone') {
      telephoneControl.setValidators([Validators.required]);
      telephoneControl.enable();
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
}
