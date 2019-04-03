import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {
    static plageMinimum(valeurMinimum: number): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL autrement retourner un cle valeur JSON
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value != null) {
                if (c.value.trim().length >= valeurMinimum) {
                    return null;
                }
            }
            
            return {'nbreCaracteresInsuffisants': true};
        }
    }

    static plageMaximum(valeurMinimum: number): ValidatorFn {
        // Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL autrement retourner un cle valeur JSON
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value != null) {
                if (c.value.trim().length >= valeurMinimum) {
                    return null;
                }
            }
            
            return {'nbreCaracteresInsuffisants': true};
        }
    }
}