import React, { FunctionComponent } from "react";
import { IonGrid, IonCol, IonRow, IonIcon, IonList, } from "@ionic/react";

import { Item } from "../models/items";

interface Props {
  item: Item;
  onDelete: (item: Item) => void;
}

export const ListItem: FunctionComponent<Props> = ({ item, onDelete }) => {
  const onClick = () => {
    onDelete(item);
  };

  return (
    <IonList>
      <IonGrid>
        <IonRow>
          <IonCol>
            {item.name}
          </IonCol>
          <IonCol>
            <IonIcon className="floatButton paddingRightDelete" name="close" onClick={onClick}/>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};