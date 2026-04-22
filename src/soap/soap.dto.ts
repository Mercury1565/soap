export interface ExtensionItem {
  key: string;
  value: string;
}

export interface SyncOrderRelationPayload {
  userID: { ID: string };
  spID: string;
  productID: string;
  serviceID: string;
  updateType: string;
  updateTime: string;
  effectiveTime: string;
  expiryTime: string;
  extensionInfo: { item: ExtensionItem[] };
}
