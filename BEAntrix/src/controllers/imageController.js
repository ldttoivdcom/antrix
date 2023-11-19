const fs = require("fs");
exports.getImage = async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const imagePath = `./src/template/images/${imageName}`;
        if (fs.existsSync(imagePath)) {
          const image_content = fs.readFileSync(imagePath);
          res.setHeader("Content-Type", "image/png");
          res.send(image_content);
        } else {
          res.status(404).json({ code: 404, message: "Image not found" });
        }

    }catch (e) {
        return res.status(400).json({code: "400", message: "Get image failed", error: e.toString()});
    }
}
