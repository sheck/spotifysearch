import { Application } from "stimulus"

import SearchController from "./controllers/search_controller"

const application = Application.start()
application.register("search", SearchController)
