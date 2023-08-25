import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const Translate = () => {
  const { t, i18n } = useTranslation();
  const [selectLanguage, setSelectLanguage] = useState<string>(i18n.language);

  const onClickLanguageChange = (e: any) => {
    setSelectLanguage(e.target.value as string);
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t("Language")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Language"
            onChange={onClickLanguageChange}
            value={selectLanguage}
          >
            <MenuItem value={"en"}>{t("English")}</MenuItem>
            <MenuItem value={"pl"}>{t("Polish")}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Translate;
