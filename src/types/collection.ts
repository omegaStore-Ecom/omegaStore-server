export interface Collection extends Document {
  collectionName: string;
  collectionDescription: string;
  collectionStatus: number;
  collectionImage: string;
  collectionOwner: string;
}
