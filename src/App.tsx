import React from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import * as yup from "yup";

type CustomRadioProps = {
  label: string;
} & FieldAttributes<{}>;

const CustomRadio: React.FC<CustomRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const CustomTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required()
    .max(10),
  friends: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const App: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          isLidskaTroska: false,
          smells: [],
          yearsLoseHair: "",
          friends: [{ id: Math.random(), name: "404", type: "imaginary" }]
        }}
        validationSchema={validationSchema}
        // one way of validation
        // validate={values => {
        //   const errors: Record<string, string> = {};
        //   if (values.name.includes("lukas")) {
        //     errors.name = "picusi";
        //   }

        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log(data);

          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          // display the content of the form
          <Form>
            <CustomTextField placeholder="name" name="name" type="input" />
            <div>
              <Field
                placeholder="surname"
                name="surname"
                type="input"
                as={TextField}
              />
            </div>
            <div>
              <Field name="isLidskaTroska" type="checkbox" as={Checkbox} />
              <div>smells</div>
              <div>
                <Field
                  name="smells"
                  type="checkbox"
                  value="feet"
                  as={Checkbox}
                />
                <Field
                  name="smells"
                  type="checkbox"
                  value="ano"
                  as={Checkbox}
                />
                <Field
                  name="smells"
                  type="checkbox"
                  value="dick"
                  as={Checkbox}
                />
              </div>
              <div> Losing Hair </div>
              <CustomRadio
                name="yearsLoseHair"
                type="radio"
                value="1"
                label="1"
              />
              <CustomRadio
                name="yearsLoseHair"
                type="radio"
                value="2"
                label="2"
              />
              <CustomRadio
                name="yearsLoseHair"
                type="radio"
                value="3"
                label="3"
              />
            </div>
            <div>
              <FieldArray name="friends">
                {arrayHelpers => (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          type: "casper",
                          name: "",
                          id: Math.random()
                        })
                      }
                    >
                      Add friend
                    </Button>
                    {values.friends.map((f, index) => {
                      return (
                        <div key={f.id}>
                          <CustomTextField
                            placeholder="friends"
                            name={`friends.${index}.name`}
                          />
                          <Field
                            name={`friends.${index}.type`}
                            type="select"
                            as={Select}
                          >
                            <MenuItem value="casper">casper</MenuItem>
                            <MenuItem value="ghost">ghost</MenuItem>
                          </Field>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            X
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>
            <Button disabled={isSubmitting} type="submit">
              submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
