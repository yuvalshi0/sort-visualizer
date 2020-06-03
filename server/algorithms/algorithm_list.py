from flask_restful import Resource, abort
from algorithms.algorithm_enum import SUPPORTED_ALGORITHMS


class Algorithms(Resource):
    def get(self):
        return {'data': SUPPORTED_ALGORITHMS}