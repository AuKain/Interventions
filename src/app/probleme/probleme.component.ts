import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur/longueur.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

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
    .subscribe(cat => this.typesProblemes = cat,
              error => this.errorMessage = <any>error);
  }

  gestionDates(typeCueillette: string): void {
    const courrielControl = this.problemeForm.get('datesGroup.dateCommande');
    const courrielConfirmationControl = this.problemeForm.get('datesGroup.dateExpedition');   
    const telephoneControl = this.problemeForm.get('datesGroup');      

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

    if (typeCueillette === 'courriel') {
      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();  
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
      telephoneControl.setValidators([Validators.required]);
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
}
