// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Relationships" titleTo="relationships" buttonLabel="New Relationship" buttonTo="newRelationship">
        <Route path="/relationships/new" page={RelationshipNewRelationshipPage} name="newRelationship" />
        <Route path="/relationships/{id:Int}/edit" page={RelationshipEditRelationshipPage} name="editRelationship" />
        <Route path="/relationships/{id:Int}" page={RelationshipRelationshipPage} name="relationship" />
        <Route path="/relationships" page={RelationshipRelationshipsPage} name="relationships" />
      </Set>
      <Set wrap={ScaffoldLayout} title="TypeRelationships" titleTo="typeRelationships" buttonLabel="New TypeRelationship" buttonTo="newTypeRelationship">
        <Route path="/type-relationships/new" page={TypeRelationshipNewTypeRelationshipPage} name="newTypeRelationship" />
        <Route path="/type-relationships/{id:Int}/edit" page={TypeRelationshipEditTypeRelationshipPage} name="editTypeRelationship" />
        <Route path="/type-relationships/{id:Int}" page={TypeRelationshipTypeRelationshipPage} name="typeRelationship" />
        <Route path="/type-relationships" page={TypeRelationshipTypeRelationshipsPage} name="typeRelationships" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Entities" titleTo="entities" buttonLabel="New Entity" buttonTo="newEntity">
        <Route path="/entities/new" page={EntityNewEntityPage} name="newEntity" />
        <Route path="/entities/{id:Int}/edit" page={EntityEditEntityPage} name="editEntity" />
        <Route path="/entities/{id:Int}" page={EntityEntityPage} name="entity" />
        <Route path="/entities" page={EntityEntitiesPage} name="entities" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
