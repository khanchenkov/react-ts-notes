import React, {FC} from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import {TagsFilterProps, TagOption} from "../../types/types";

const DropdownIndicator = (props: DropdownIndicatorProps<TagOption, true>) => {
    return <components.DropdownIndicator {...props} />;
};

const TagsFilter:FC<TagsFilterProps> = ({userTags, setFilter}) => {
    return (
        <Select
            closeMenuOnSelect={false}
            components={{ DropdownIndicator }}
            defaultValue={[]}
            isMulti
            onChange={(choice: any) => setFilter(choice.map((item: TagOption) => item.value))}
            options={userTags}
        />
    );
};

export default TagsFilter;
