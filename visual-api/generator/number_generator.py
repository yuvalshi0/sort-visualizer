from flask_restful import Resource, abort
from flask import request
import random


class Generator(Resource):
    def error(self):
        abort(404, message="Invalid request")

    def post(self):
        arr = []
        json = request.get_json()
        if 'data' not in json:
            self.error()
        data = json['data']
        if 'count' not in data:
            self.error()
        try:
            if 'start' and 'end' in data:
                arr = self.generate_arr(int(data['count']), int(
                    data['start']), int(data['end']))
            else:
                arr = self.generate_arr(int(data['count']))
            return {'data': arr}, 200
        except (ValueError, TypeError):
            self.error()

    def generate_arr(self, count, start=0, end=100):
        arr = []
        for _ in range(0, count):
            arr.append(random.randint(start, end))

        return arr
