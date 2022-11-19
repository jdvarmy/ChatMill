import store, { StoreEvents, StoreType } from '../packages/Store/Store';
import isEqual from '../utils/functions/isEqual';

export function connect(mapStateToProps: (state: StoreType) => any) {
  return function (Component: any) {
    return class extends Component {
      state = {};

      constructor(props: any) {
        const state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.subscribe(StoreEvents.updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(this.state, newState)) {
            this.setProps({ ...newState });
            this.state = newState;
          }
        });
      }
    };
  };
}
