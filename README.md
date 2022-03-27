# Use Gouache React hook

```jsx
const MyApp = () => {
  const { styles, isLoading } = useGouache("MY_GOUACHE_API_KEY");

  if(isLoading){
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>{JSON.stringify(styles)}</p>
    </>
  )
}
```