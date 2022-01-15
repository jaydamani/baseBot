import { Listener, Store } from "@sapphire/framework"
import { blue, gray } from 'colorette'

export class UserListener extends Listener {

	public run(){
		console.log('logged in')
		this.printStoreDebugInformation()
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${blue(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
