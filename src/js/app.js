import { OP } from "./_libs/operator/app";
import { Launch } from "./launch/app";
import "/src/sass/app.scss";

const launch = new Launch();

OP.node.on(document, 'DOMContentLoaded', () => {
  launch.init();
});
