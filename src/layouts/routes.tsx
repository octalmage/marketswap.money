import { Switch, Route } from 'react-router-dom'

import Market from '../pages/market/Market'

import ErrorComponent from '../components/ErrorComponent'

export default (
  <Switch>
    <Route path="/" component={Market} />
    <Route render={() => <ErrorComponent card />} />
  </Switch>
)
