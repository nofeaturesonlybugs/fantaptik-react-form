`Form.Buttons` is equivalent to `Buttons` with the addition of automatic integration to the `Form.Context`.

```jsx
const Line = () => <hr />;
<Form.Buttons round>
    <Form.Buttons.Cancel />
    <Form.Buttons.Reset />
    <Form.Buttons.FullReset />
    <Form.Buttons.Submit />
    <Line />

    <Form.Buttons.Create />
    <Form.Buttons.Delete />
    <Form.Buttons.Edit />
</Form.Buttons>
```

A list of individual buttons.

```jsx
<div>
    <Form.Buttons.Cancel /> Buttons.Cancel
</div>
<div>
    <Form.Buttons.FullReset /> Buttons.FullReset
</div>
<div>
    <Form.Buttons.Reset /> Buttons.Reset
</div>
<div>
    <Form.Buttons.Submit /> Buttons.Submit
</div>
<hr />

<div>
    <Form.Buttons.Create /> Buttons.Create
</div>
<div>
    <Form.Buttons.Delete /> Buttons.Delete
</div>
<div>
    <Form.Buttons.Edit /> Buttons.Edit
</div>
```
