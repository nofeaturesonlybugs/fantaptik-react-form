`Buttons` is a namespace for form appropriate buttons.

```jsx
const Line = () => <hr />
;<Buttons round>
	<Buttons.Cancel />
	<Buttons.FullReset />
	<Buttons.Reset round={false} />
	<Buttons.Submit />
	<Line />

	<Buttons.Create />
	<Buttons.Delete />
	<Buttons.Edit />
</Buttons>
```

A list of individual buttons.

```jsx
<div>
    <Buttons.Cancel /> Buttons.Cancel
</div>
<div>
    <Buttons.FullReset /> Buttons.FullReset
</div>
<div>
    <Buttons.Reset /> Buttons.Reset
</div>
<div>
    <Buttons.Submit /> Buttons.Submit
</div>
<hr />

<div>
    <Buttons.Create /> Buttons.Create
</div>
<div>
    <Buttons.Delete /> Buttons.Delete
</div>
<div>
    <Buttons.Edit /> Buttons.Edit
</div>
```
