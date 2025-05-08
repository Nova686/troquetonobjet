import axiosService from "../../../../services/AxiosService";
import {useEffect, useState, useRef} from "react";
import {Category, SubCategory} from "../../../../typings/Categories";
import {TextField} from "../../../atoms";
import {ChangeEvent, KeyboardEvent} from "react";
import theme from "../../../../theme";
import {useToast} from "../../../../contexts/ToastContext";

const Categories = () =>
{
    const [categories, setCategories] = useState<Category[]>([]);
    const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});
    const {showToast} = useToast();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubCategoryNames, setNewSubCategoryNames] = useState<Record<number, string>>({});

    const addNewCategory = async () => {

        const category = categories.find(c => c.name === newCategoryName);

        if (category)
        {
            showToast({
                message: `La catégorie "${newCategoryName}" existe déjà.`,
                position: { vertical: "bottom", horizontal: "right" },
                type: 'error'
            });
            return;
        }

        if (!newCategoryName.trim() || category) return;

        try {
            const response = await axiosService.post('category', { name: newCategoryName, language_id: 1 });
            setCategories(prev => [...prev, { ...response.data.category }]);
            setNewCategoryName("");
            showToast({
                message: `Catégorie "${newCategoryName}" créée avec succès`,
                position: { vertical: "bottom", horizontal: "right" },
                type: 'success'
            });
        } catch (error) {
            console.error("Error creating category:", error);
            showToast({
                message: "Erreur lors de la création de la catégorie",
                position: { vertical: "bottom", horizontal: "right" },
                type: 'error'
            });
        }
    };

    const addNewSubCategory = async (categoryId: number) => {
        const subCategoryName = newSubCategoryNames[categoryId];
        const subCategory = categories.find(c => c.id === categoryId)?.subCategories.find(c => c.name === subCategoryName);

        if (subCategory)
        {
            showToast({
                message: `La sous-catégorie "${subCategoryName}" existe déjà.`,
                position: { vertical: "bottom", horizontal: "right" },
                type: 'error'
            });
        }

        if (!subCategoryName?.trim() || subCategory) return;

        try {
            const response = await axiosService.post('subcategory', {
                name: subCategoryName,
                category_id: categoryId,
                language_id: 1
            });

            setCategories(prev => prev.map(cat =>
                cat.id === categoryId
                    ? { ...cat, subCategories: [...cat.subCategories, response.data.subCategory] }
                    : cat
            ));

            setNewSubCategoryNames(prev => ({ ...prev, [categoryId]: "" }));
            showToast({
                message: `Sous-catégorie "${subCategoryName}" créée avec succès`,
                position: { vertical: "bottom", horizontal: "right" },
                type: 'success'
            });
        } catch (error) {
            console.error("Error creating subcategory:", error);
            showToast({
                message: "Erreur lors de la création de la sous-catégorie",
                position: { vertical: "bottom", horizontal: "right" },
                type: 'error'
            });
        }
    };

    const handleNewSubCategoryChange = (categoryId: number, value: string) => {
        setNewSubCategoryNames(prev => ({ ...prev, [categoryId]: value }));
    };

    const loadCategories = async () =>
    {
        try
        {
            const response = await axiosService.get('category/all/1');
            const data = Array.isArray(response.data.categories)
                ? response.data.categories.map((c: Category) => ({...c, isEditing: false}))
                : [];
            setCategories(data);
        } catch (error)
        {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    const updateCategory = async (id: number, newName: string) =>
    {
        try
        {
            if (newName === '')
            {
                await axiosService.delete(`category/${id}`);

                setCategories(prev => prev.filter(cat => cat.id !== id));
            }
            else
            {
                await axiosService.put(`category/${id}`, {name: newName});
            }

            showToast({
                message:  `La catégorie ${newName} a bien été modifiée.`,
                position: {vertical: "bottom", horizontal: "right"},
                type:     'success'
            });
        } catch (error)
        {
            console.error("Error updating category:", error);
        }
    };

    const handleCategoryChange = (id: number, newValue: string) =>
    {
        const findingCategory = categories.find((c: Category) => c.name === newValue);

        if (findingCategory !== undefined)
        {
            showToast({
                message:  `La catégorie ${newValue} existe déjà.`,
                position: {vertical: "bottom", horizontal: "right"},
                type:     'error'
            });
        } else
        {
            setCategories(prev => prev.map(cat =>
                cat.id === id ? {...cat, name: newValue} : cat
            ));
        }
    };

    const hasSubCategoryName = (newName: string): boolean =>
    {
        for (const category of categories)
        {
            for (const subCategory of category.subCategories)
            {
                if (subCategory.name.toLowerCase() === newName.toLowerCase())
                {
                    return true;
                }
            }
        }
        return false;
    };

    const handleSubCategoryChange = (categoryId: number, subId: number, newValue: string) =>
    {
        if (hasSubCategoryName(newValue))
        {
            showToast({
                message:  `La sous-catégorie ${newValue} existe déjà.`,
                position: {vertical: "bottom", horizontal: "right"},
                type:     'error'
            });
        } else
        {
            setCategories(prev => prev.map(cat =>
            {
                if (cat.id !== categoryId) return cat;
                return {
                    ...cat,
                    subCategories: cat.subCategories.map(sub =>
                        sub.id === subId ? {...sub, name: newValue} : sub
                    )
                };
            }));
        }
    };

    const handleCategorySubmit = (id: number) =>
    {
        const category = categories.find(c => c.id === id);
        if (category)
        {
            updateCategory(id, category.name);
        }
    };

    const handleSubCategorySubmit = (categoryId: number, subCategoryId: number) =>
    {
        const subCategory = categories.find(c => c.id === categoryId)?.subCategories.find(c => c.id === subCategoryId);
        if (subCategory)
        {
            updateSubCategory(subCategoryId, subCategory.name, categoryId);
        }
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        id: number,
        isSubCategory: boolean = false,
        categoryId?: number
    ) =>
    {
        if (e.key === 'Enter')
        {
            e.preventDefault();
            const input = e.currentTarget;
            input.dataset.suppressBlur = 'true';

            if (isSubCategory && categoryId)
            {
                handleSubCategorySubmit(categoryId, id);
            } else
            {
                handleCategorySubmit(id);
            }

            setTimeout(() =>
            {
                input.dataset.suppressBlur = 'false';
                input.blur();
            }, 100);
        }
    };

    const updateSubCategory = async (subCategoryId: number, newName: string, categoryId: number) =>
    {
        try
        {
            if (newName === '')
            {
                await axiosService.delete(`subcategory/${subCategoryId}`);

                setCategories(prev => prev.map(cat =>
                {
                    if (cat.id !== categoryId) return cat;
                    return {
                        ...cat,
                        subCategories: cat.subCategories.filter(sub => sub.id !== subCategoryId)
                    };
                }));
            } else
            {
                await axiosService.put(`subcategory/${subCategoryId}`, {name: newName});
            }

            showToast({
                message:  `La sous-catégorie ${newName} a bien été ${newName === '' ? 'suprimée' : 'modifiée'}.`,
                position: {vertical: "bottom", horizontal: "right"},
                type:     'success'
            });
        } catch (error)
        {
            console.error("Error updating category:", error);
        }
    };

    useEffect(() =>
    {
        loadCategories();
    }, []);

    return (
        <div>
            <h1 style={{color: theme.palette.custom.textColor, marginBottom: "8px"}}>Gestion des catégories et sous
                catégories</h1>
            <div style={{color: theme.palette.custom.danger, marginBottom: "24px"}}><strong>ATTENTION</strong> Pour
                valider vos changement il suffit d'appuyer sur "Entrer" après modification.
            </div>

            <TextField
                key={-1}
                value={newCategoryName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategoryName(e.target.value)}
                placeholder="Nouvelle catégorie"
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewCategory()}
                sx={{ width: '60%' }}
            />

            <div style={{width: '60%'}}>
                {categories.map((category: Category) => (
                    <div key={category.id} style={{marginBottom: "1rem"}}>
                        <TextField
                            inputRef={(el: HTMLInputElement | null) =>
                            {
                                inputRefs.current[category.id] = el;
                            }}
                            value={category.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleCategoryChange(category.id, e.target.value)}
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, category.id, false)}
                            sx={{width: '100%'}}
                        />

                        <div style={{display: "flex", alignItems: "flex-end", flexDirection: "column"}}>
                            {category.subCategories.map((subCategory: SubCategory) => (
                                <TextField
                                    key={subCategory.id}
                                    value={subCategory.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubCategoryChange(category.id, subCategory.id, e.target.value)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, subCategory.id, true, category.id)}
                                    sx={{width: '90%', mt: 1}}
                                />
                            ))}

                            <TextField
                                value={newSubCategoryNames[category.id] || ""}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleNewSubCategoryChange(category.id, e.target.value)}
                                placeholder="Nouvelle sous-catégorie"
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewSubCategory(category.id)}
                                sx={{ width: '90%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;