import { Router } from "express";
import * as ctrl from "../controllers/listMaster.controller";

const router = Router();

router.get("/", ctrl.getAll);           
router.get("/:id", ctrl.getById);       
router.post("/", ctrl.create);          
router.put("/:id", ctrl.update);        
router.delete("/all", ctrl.removeAll);  
router.delete("/:id", ctrl.remove);     

export default router;