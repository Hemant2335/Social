
type WrapperProps = {
    children: React.ReactNode;
    classname?: string;
    
}

const Wrapper = ({children  , classname} : WrapperProps) => {
  return (
    <div className={`w-full md:max-w-[70vw] px-5 md:px-10 mx-auto ${classname || "" }`}>{children}</div>
  )
}

export default Wrapper