import { useState, useCallback, useEffect } from "react";
import { useToast, Checkbox } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

const App = () => {

  // React hooks
  const [length, setLength] = useState<string>("10"); 
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true); 
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true); 
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false); 
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<string>("WEAK"); 

  // Chakra UI hook for toast
  const toast = useToast();

  // Generates password
  const generatePassword = useCallback(() => {
    let characters: string = "";
    if (includeUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (includeNumbers) {
      characters += "0123456789";
    }
    if (includeSymbols) {
      characters += "!.,@#$%^&*()_-+=<>?/{}[]";
    }

    if (characters === "") {
      setPassword("Select character types");
      setStrength("N/A");
      return;
    }

    let pass: string = "";
    for (let i = 0; i < Number(length); i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters[randomIndex];
    }
    setPassword(pass);
    // Basic strength calculation (can be improved)
    if (
      Number(length) >= 12 &&
      (includeUppercase || includeLowercase) &&
      includeNumbers &&
      includeSymbols
    ) {
      setStrength("STRONG");
    } else if (
      Number(length) >= 8 &&
      (includeUppercase || includeLowercase) &&
      (includeNumbers || includeSymbols)
    ) {
      setStrength("MEDIUM");
    } else {
      setStrength("WEAK");
    }
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  // Function to copy the password
  const copyPassword = () => {
    window.navigator.clipboard
      .writeText(password)
      .then(() => {
        toast({
          title: "Copied!",
          status: "success",
          colorScheme: "blue",
          duration: 1500,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Copy failed",
          status: "error",
          duration: 1500,
        });
      });
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // const strengthColor = (strength: string) => {
  //   switch (strength) {
  //     case "WEAK":
  //       return "text-red";
  //     case "MEDIUM":
  //       return "text-yellow";
  //     case "STRONG":
  //       return "text-green";
  //     default:
  //       return "text-white";
  //   }
  // };

  return (
    // Container
    <div className="w-auto max-w-md mx-auto p-6 bg-[#24232C] rounded-lg shadow-xl">
      {/* Title */}
      <h2 className="text-center text-white text-4xl mb-6">PassGen</h2>

      {/* Password Display */}
      <div className="flex items-center bg-[#2D2C35] rounded-md overflow-hidden mb-6">
        <input
          type="text"
          className="outline-none bg-transparent w-full py-3 px-4 text-lg text-green-400"
          value={password}
          placeholder="Generated Password"
          readOnly
        />
        <button
          className="outline-none bg-[#23252c] px-4 py-3 shrink-0 hover:bg-gray-500 text-white"
          onClick={copyPassword}
          aria-label="Copy password"
        >
          <CopyIcon color={"white"} />
        </button>
      </div>

      {/* Controls Section */}
      <div className="bg-[#2D2C35] text-white p-4 rounded-md mb-6">
        {/* Character Length */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Character Length</label>
          <div className="flex items-center gap-x-4">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(event) => {
                setLength(event.target.value);
              }}
              className="w-full h-2 bg-[#18171F] rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-green-400 text-lg font-bold">{length}</span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-y-2 text-sm">
          <Checkbox
            size="sm"
            colorScheme="green"
            isChecked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          >
            Include Uppercase Letters
          </Checkbox>
          <Checkbox
            size="sm"
            colorScheme="green"
            isChecked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          >
            Include Lowercase Letters
          </Checkbox>
          <Checkbox
            size="sm"
            colorScheme="green"
            isChecked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          >
            Include Numbers
          </Checkbox>
          <Checkbox
            size="sm"
            colorScheme="green"
            isChecked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          >
            Include Symbols
          </Checkbox>
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="flex justify-between items-center bg-[#18171F] p-4 rounded-md mb-6">
        <span className="text-white-900 text-sm text-white">STRENGTH</span>
        <span className={`text-lg font-bold text-white`}>
          {strength}
        </span>
      </div>
    </div>
  );
};

export default App;
