import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import static_data from "../assets/static_data.json";

const notEmpty = (data) => {
  return (
    data.make &&
    data.model &&
    data.year &&
    data.price &&
    data.country &&
    data.region
  );
};

const BikeForm = ({ BtnName, handleSumbit, form, handleChange }) => {
  return (
    <form onSubmit={handleSumbit}>
      <FormControl id="make" isRequired>
        <FormLabel>Make</FormLabel>
        <Input
          placeholder="Make"
          value={form.make}
          name="make"
          onChange={(e) => handleChange("make", e.target.value)}
        />
      </FormControl>

      {/* Stop input after === 1 */}
      <FormControl id="model" isRequired>
        <FormLabel>Model</FormLabel>
        <Input
          placeholder="Model"
          value={form.model}
          name="model"
          onChange={(e) => handleChange("model", e.target.value)}
        />
      </FormControl>

      {/* INT */}
      <FormControl id="year" isRequired>
        <FormLabel>Year</FormLabel>
        <NumberInput
          step={1}
          min={1970}
          max={2023}
          name="year"
          value={form.year}
          onChange={(e) => handleChange("year", e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      {/* INT */}
      <FormControl id="price" isRequired>
        <FormLabel>Price</FormLabel>
        <NumberInput
          step={10}
          defaultValue={0}
          min={0}
          max={20000}
          name="price"
          value={form.price}
          onChange={(e) => handleChange("price", e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          name="country"
          onChange={(e) => handleChange("country", e.target.value)}
          value={form.country}
        >
          {static_data.countries.map((c) => (
            <option>{c}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="region" isRequired>
        <FormLabel>Region</FormLabel>
        <Select
          placeholder="Select Region"
          name="region"
          onChange={(e) => handleChange("region", e.target.value)}
          value={form.region}
        >
          {form.country === "USA"
            ? static_data.states.map((s) => <option>{s}</option>)
            : static_data.provinces.map((p) => <option>{p}</option>)}
        </Select>
      </FormControl>

      <FormControl id="about">
        <FormLabel>About</FormLabel>
        <Textarea
          name="about"
          value={form.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Tell us about your bike"
          size="sm"
        />
      </FormControl>

      <FormControl id="size">
        <FormLabel>Size</FormLabel>
        <Select
          placeholder="Select Size"
          name="size"
          onChange={(e) => handleChange("size", e.target.value)}
          value={form.size}
        >
          {static_data.size.map((z) => (
            <option>{z}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="color">
        <FormLabel>Color</FormLabel>
        <Select
          placeholder="Select Color"
          name="color"
          onChange={(e) => handleChange("color", e.target.value)}
          value={form.color}
        >
          {static_data.colors.map((c) => (
            <option>{c}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="wheel_size">
        <FormLabel>Wheel Size</FormLabel>
        <Select
          placeholder="Select Wheel Size"
          name="wheelSize"
          value={form.wheelSize}
          onChange={(e) => handleChange("wheelSize", e.target.value)}
        >
          {static_data.wheel_size.map((w) => (
            <option>{w}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="suspension">
        <FormLabel>Suspension</FormLabel>
        <Select
          placeholder="Select Suspension Type"
          name="suspension"
          onChange={(e) => handleChange("suspension", e.target.value)}
          value={form.suspension}
        >
          {static_data.suspension.map((s) => (
            <option>{s}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl id="front">
        <FormLabel>Front</FormLabel>
        <NumberInput
          step={10}
          defaultValue={100}
          min={0}
          max={300}
          name="front"
          value={form.suspension !== "none" ? form.front : 0}
          onChange={(e) => handleChange("front", e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="rear">
        <FormLabel>Rear</FormLabel>
        <NumberInput
          step={10}
          defaultValue={100}
          min={0}
          max={300}
          name="rear"
          value={form.suspension === "full" ? form.rear : 0}
          onChange={(e) => handleChange("rear", e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl id="upgrades">
        <FormLabel>Upgrades</FormLabel>
        <Textarea
          name="upgrades"
          value={form.upgrades}
          onChange={(e) => handleChange("upgrades", e.target.value)}
          placeholder="Please list any additonal upgrades or details"
          size="sm"
        />
      </FormControl>

      {notEmpty(form) ? (
        <Button type="submit" colorScheme="blue">
          {BtnName}
        </Button>
      ) : (
        <Button type="submit" disabled>
          {BtnName}
        </Button>
      )}
    </form>
  );
};

export default BikeForm;
