# Import required libraries
from fastbook import *
from duckduckgo_search import ddg_images


# Function to search images using DuckDuckGo Image Search API
def search_images_ddg(term, max_images=30):
    print(f"Searching for '{term}'")
    return L(ddg_images(term, max_results=max_images)).itemgot("image")


# Define brands and components types
brands_components_types = (
    "nvidia_gpu",
    "amd_gpu",
    "intel_cpu",
    "amd_cpu",
    "pc_gamer",
    "macbook",
)

# Create a folder for images if it doesn't exist
path = Path("brands_components")
if not path.exists():
    path.mkdir()
    for o in brands_components_types:
        dest = path / o
        dest.mkdir(exist_ok=True)
        # Search and download images for each term
        results = search_images_ddg(o)
        download_images(dest, urls=results.attrgot("contentUrl"))

# Get all downloaded image files and remove any corrupted ones
fns = get_image_files(path)
failed = verify_images(fns)
failed.map(Path.unlink)

# Create a DataBlock for the images dataset
brands_components = DataBlock(
    blocks=(ImageBlock, CategoryBlock),
    get_items=get_image_files,
    splitter=RandomSplitter(valid_pct=0.2, seed=42),
    get_y=parent_label,
    item_tfms=Resize(128),
)

# Create DataLoaders for the dataset
dls = brands_components.dataloaders(path)

# Update the DataBlock with new transformations
brands_components = brands_components.new(
    item_tfms=RandomResizedCrop(224, min_scale=0.5), batch_tfms=aug_transforms()
)

# Create new DataLoaders with the updated DataBlock
dls = brands_components.dataloaders(path)

# Create a learner using a pre-trained resnet18 model and fine-tune it
learn = vision_learner(dls, resnet18, metrics=error_rate)
learn.fine_tune(4)
