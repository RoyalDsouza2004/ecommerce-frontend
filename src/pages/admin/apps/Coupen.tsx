import { FormEvent, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupen = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols) {
      toast.error('Please select at least one option')
      return;
    }

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  const copyText = async (coupon: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(coupon);
        toast.success(`"${coupon}" Copied to Clipboard!`)
        setIsCopied(true);
      } catch (err) {
        console.error("Failed to copy: ", err);
        fallbackCopyText(coupon);
      }
    } else {
      fallbackCopyText(coupon);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      toast.success(`"${text}" Copied to Clipboard!`)
      setIsCopied(true);
    } catch (err) {
      toast.error("Failed to copy ");
    }

    document.body.removeChild(textArea);
  };

  useEffect(() => {
    return () => { setIsCopied(false) };
  }, [coupon]);

  return (
    <main className="bg-white p-16">
      <h1 className="text-3xl font-bold">Coupon</h1>
      <section className="flex flex-col justify-center items-center gap-8 h-full ">
        <form className="grid grid-cols-[2fr_1fr] gap-8 max-w-[30rem] w-full max-sm:flex max-sm:flex-col" onSubmit={submitHandler}>
          <input type="text" placeholder="Enter prefix" className="border border-black focus:outline-none p-4 rounded-[5px]"
            value={prefix} onChange={e => setPrefix(e.target.value)}
            maxLength={size} />

          <input type="number" placeholder="Coupon length" className="border border-black focus:outline-none p-4 rounded-[5px]"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
            min={8} max={25} />

          <fieldset className="p-8 border border-black rounded-[5px] flex justify-center items-center flex-wrap col-[1/3] max-sm:flex-col max-sm:gap-4">
            <legend>Include</legend>
            <input type="checkbox" className="border border-black focus:outline-none p-4 rounded-[5px]"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(prev => !prev)}
            />
            <span className="text-[0.8rem] font-light ms-1 me-4">Numbers</span>

            <input type="checkbox" className="border border-black focus:outline-none p-4 rounded-[5px]"
              checked={includeCharacters}
              onChange={() => setIncludeCharacters(prev => !prev)}
            />
            <span className="text-[0.8rem] font-light ms-1 me-4">Characters</span>

            <input type="checkbox" className="border border-black focus:outline-none p-4 rounded-[5px]"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(prev => !prev)}
            />
            <span className="text-[0.8rem] font-light ms-1 me-4">Symbols</span>
          </fieldset>
          <button type="submit" className="font-bold text-[1.1rem] w-full p-4 border-none text-white cursor-pointer my-8 rounded-md bg-blue-600 col-[1/3]">Generate</button>
        </form>

        {coupon && <code className="relative text-[1.2rem] tracking-normal cursor-pointer ">
          {coupon} <span className="hover:opacity-100 opacity-0 w-full rounded-[5px] h-full absolute top-0 left-0 bg-black text-white text-center" onClick={() => copyText(coupon)}>{isCopied ? "Copied" : "Copy"}</span>
        </code>}
      </section>
    </main>
  );
}

export default Coupen;
