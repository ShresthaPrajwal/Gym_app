import { Badge, Button, Card, Input, PageLayout, Select } from './components'

function App() {
  return (
    <PageLayout>
      <Card>
        <Badge>MVP</Badge>
        <h1 className="text-2xl font-semibold">Gym App</h1>
        <Input placeholder="Search exercises…" />
        <Select defaultValue="">
          <option value="" disabled>
            Select a goal
          </option>
          <option value="abs">Abs</option>
          <option value="bulk">Bulk</option>
          <option value="cut-lean">Cut / Lean</option>
        </Select>
        <Button>Get started</Button>
      </Card>
    </PageLayout>
  )
}

export default App
