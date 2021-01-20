import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppinglistActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     console.log(this.editMode);
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   }
    // );
  }

  onAddItem(form: NgForm): void {
    const  value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppinglistActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppinglistActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppinglistActions.StopEdit());
  }

  onDelete(): void {
    this.onClear();
    this.store.dispatch(new ShoppinglistActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppinglistActions.StopEdit());
  }
}
