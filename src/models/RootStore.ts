import { createContext } from 'react';
import {
  model,
  Model,
  prop,
  modelFlow,
  _async,
  _await,
  registerRootStore,
  modelAction,
  fromSnapshot,
} from 'mobx-keystone';
import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import SocialAccount from './SocialAccount';

@model('myApp/Root')
class Root extends Model({
  github: prop<SocialAccount>(() => new SocialAccount({})),
}) {
  private storageKey = 'myApp-storage-key';
  @observable loading = true;

  onInit = () => {
    console.log('Initialize Root Store.');
    this.loadSocialAccount();
  };

  @modelFlow
  loadSocialAccount = _async(function* (this: Root) {
    try {
      console.log('Retrieve stored data.');
      const data = yield* _await(AsyncStorage.getItem(this.storageKey));
      const validData = data ?? undefined;

      if (!validData) {
        return;
      }

      console.log('Load stored data.');
      const socialAccountObj = JSON.parse(validData);
      const socialAccount = fromSnapshot<SocialAccount>(socialAccountObj);
      this.setSocialAccount(socialAccount);
    } catch (error) {
    } finally {
      this.loading = false;
    }
  });

  @modelAction
  private setSocialAccount = (account: SocialAccount) =>
    (this.github = account);
}

const createStore = (): Root => {
  const store = new Root({});
  registerRootStore(store);
  return store;
};

const appContext = createContext(createStore());
export default appContext;
