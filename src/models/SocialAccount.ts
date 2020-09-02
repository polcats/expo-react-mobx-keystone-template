import { model, Model, prop, modelAction, getSnapshot } from 'mobx-keystone';
import { reaction } from 'mobx';
import { AsyncStorage } from 'react-native';

@model('qrofile/SocialAccount')
class SocialAccount extends Model({
  name: prop<string>(''),
}) {
  private storageKey = 'myApp-storage-key';

  onAttachedToRootStore() {
    // every time the snapshot of the configuration changes
    const reactionDisposer = reaction(
      () => getSnapshot(this),
      (sn) => {
        // save the config to local storage
        console.log('Saving changes.');
        AsyncStorage.setItem(this.storageKey, JSON.stringify(sn));
      },
      {
        // also run the reaction the first time
        fireImmediately: true,
      },
    );
    // when the model is no longer part of the root store stop saving
    return () => {
      reactionDisposer();
    };
  }

  @modelAction
  setName = (name: string) => {
    console.log('New name:', name);
    this.name = name;
  };
}

export default SocialAccount;
